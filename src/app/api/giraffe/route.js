

import {genAi} from "../genAi.js";

export async function POST(request){ 
  const {prompt} = await request.json(); 
  const resp = await genAi(prompt);
  return Response.json({"girrafeAi" : resp});
}
