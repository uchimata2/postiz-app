/**
 * Model names for the OpenAI-compatible provider, overridable from the environment.
 *
 *   OPENAI_MODEL        every text-generation call
 *   OPENAI_AGENT_MODEL  the chat agent; falls back to OPENAI_MODEL
 *   OPENAI_IMAGE_MODEL  every image-generation call
 *
 * Each call site passes the model it used before as its fallback, so an unset
 * variable changes nothing. Together with OPENAI_BASE_URL, which the OpenAI SDKs
 * read on their own, this lets Postiz use an OpenAI-compatible gateway such as
 * OpenRouter, where model names look like `google/gemini-3.8-flash`.
 */
const firstSet = (...values: Array<string | undefined>): string | undefined =>
  values.map((value) => value?.trim()).find((value) => !!value);

export const textModel = (fallback: string): string =>
  firstSet(process.env.OPENAI_MODEL) ?? fallback;

export const agentModel = (fallback: string): string =>
  firstSet(process.env.OPENAI_AGENT_MODEL, process.env.OPENAI_MODEL) ?? fallback;

export const imageModel = (fallback: string): string =>
  firstSet(process.env.OPENAI_IMAGE_MODEL) ?? fallback;
