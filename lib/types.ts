export type Priority = "HOT" | "WARM" | "COLD";
export interface LeadAnalysis { summary: string; intent: string; requirements: string[]; concerns: string[]; recommended_next_action: string; suggested_response: string; priority_score: number; priority: Priority; priority_reasons: string[]; }
export interface Lead { id: string; name: string; location: string; propertyRequirement: string; budget: string; buyingTimeline: string; customerMessage: string; analysis?: LeadAnalysis; createdAt: string; }
export interface CallPrep { opening: string; emphasis_points: string[]; discovery_questions: string[]; likely_objection: string; objection_response: string; next_step: string; }
export interface ChatMessage { role: "user" | "assistant"; content: string; }
