import typelit from 'typelit';

export const prompt = typelit`Generate a short, creative title IN FRENCH (2-6 words) for a PICO-8 game development conversation based on this user message:

${typelit.string('initialMessage')}

The title should be engaging and related to the specific game concept mentioned. The title MUST BE in French. Just return the title, nothing else.`;
