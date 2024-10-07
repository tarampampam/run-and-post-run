const core = require('@actions/core') // https://github.com/actions/toolkit/tree/main/packages/core
const exec = require('@actions/exec') // https://github.com/actions/toolkit/tree/main/packages/exec
const process = require('process')

// read action inputs
const input = {
  run: core.getMultilineInput('run'),
  post: core.getMultilineInput('post', {required: true}),
  workingDirectory: core.getInput('working-directory'),
  shell: core.getInput('shell'),
  postShell: core.getInput('post-shell'),
  disableCommandTrace: core.getBooleanInput('disable-command-trace'),
}

export async function run() {
  return runCommands(joinMultilineCommands(input.run), input.shell)
}

export async function post() {
  return runCommands(joinMultilineCommands(input.post), input.postShell ? input.postShell : input.shell)
}

/**
 * @param {String[]} commands
 * @return {String[]}
 */
function joinMultilineCommands(commands) {
  const result = []
  const re = /\\\s*$/
  const buf = []

  for (const cmd of commands) {
    buf.push(cmd.replace(re, '')) // push command into buffer

    if (!re.test(cmd)) { // if command not ends with \
      result.push(buf.join(' ')) // join buffer and push into result

      buf.length = 0 // clear buffer
    }
  }

  return result
}

/**
 * @param {String[]} commands
 * @param {String} shell
 *
 * @return {Promise<void>}
 */
async function runCommands(commands, shell) {
  /** @type {import('@actions/exec/lib/interfaces').ExecOptions} */
  const options = {
    cwd: input.workingDirectory,
    env: process.env,
    silent: true,
    listeners: {
      stdline: (data) => core.info(data),
      errline: (data) => core.info(data),
    },
  }

  return (async () => {
    for (const command of commands) {
      if (command && command.trim() !== '') {
        core.debug(`input: ${JSON.stringify(input)}`)

        // make this behavior default in the next major version
        if (!input.disableCommandTrace) {
          core.info(`\x1b[1m$ ${command}\x1b[0m`)
        }

        const exitCode = shell === ''
          ? await exec.exec(command, [], options)
          : await exec.exec(shell, ['-c', command], options)

        if (exitCode !== 0) {
          core.setFailed(`Command failed with exit code ${exitCode}`)
        }
      }
    }
  })().catch(error => core.setFailed(error.message))
}
