
const API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY!;
const API_URL = process.env.EXPO_PUBLIC_OPENROUTER_API_URL!;
export interface Architecture {
    modality: string;
    tokenizer: string;
    instruct_type: string | null;
  }
  
  export interface Pricing {
    prompt: string;
    completion: string;
    image: string;
    request: string;
  }
  
  export interface TopProvider {
    context_length: number;
    max_completion_tokens: number;
    is_moderated: boolean;
    company: string;
  }
  
  export interface ModelData {
    id: string;
    name: string;
    created: number;
    description: string;
    context_length: number;
    architecture: Architecture;
    pricing: Pricing;
    top_provider: TopProvider;
    per_request_limits: any | null;
  }
  
  export interface OpenRouterResponse {
    data: ModelData[];
  }
  
  export async function fetchOpenRouterModels(): Promise<OpenRouterResponse> {
  const response = await fetch(API_URL+'/models');
  const data = await response.json();
  console.log(data.data);
  data.data = data.data.map((model: ModelData) => {
    const [company, modelName,description,name] = model.name.split(':').map(str => str.trim().replace(/[\s]*\(free\)[\s]*/gi, ''));
    const cleanName = (name: string) => name.replace(/[\s]*\(free\)[\s]*/gi, '').trim();
    return {
      ...model,
      name: cleanName(modelName || model.name),
      description: description ||model.description,
      top_provider: {
        ...model.top_provider,
        company: company || 'Unknown'

      }
    };
  });
  
  return data;
}

  