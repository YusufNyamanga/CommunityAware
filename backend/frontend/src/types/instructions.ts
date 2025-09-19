export interface Instruction {
  id: string;
  category: string;
  content: string;
  priority: number;
  isActive: boolean;
  language: string;
  tags: string[];
  lastUpdated: Date;
}

export interface InstructionSet {
  id: string;
  name: string;
  description: string;
  instructions: Instruction[];
  isActive: boolean;
  priority: number;
  category: string;
  lastUpdated: Date;
}

export interface CategoryMetadata {
  name: string;
  description: string;
  requiredInstructions: string[];
  optionalInstructions: string[];
}
