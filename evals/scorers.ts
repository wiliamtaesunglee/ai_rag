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

  const [func] = tool_calls
  const [expectedFunc] = expected.tool_calls

  score =
    role == 'assistant' &&
    tool_calls.length === 1 &&
    func?.name == expectedFunc.function?.name
      ? 1
      : 0

  return {
    ...response,
    score,
  }
}
