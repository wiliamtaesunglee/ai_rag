import type { Scorer } from 'autoevals'

export const ToolCallMatch: Scorer<any, {}> = async ({
  input,
  output,
  expected,
}) => {
  const { role, tool_calls } = output

  let score = 0

  let response = {
    name: 'ToolCallMatch',
    score,
  }

  if (!Array.isArray(tool_calls)) {
    return response
  }

  const [toolCall] = tool_calls
  const { function: toolFuncCall } = toolCall
  const [expectedToolCall] = expected.tool_calls
  const { function: expectedFuncCall } = expectedToolCall

  score =
    role == 'assistant' &&
    tool_calls.length === 1 &&
    toolFuncCall.name == expectedFuncCall?.name
      ? 1
      : 0

  return {
    ...response,
    score,
  }
}
