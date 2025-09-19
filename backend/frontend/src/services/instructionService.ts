import { Instruction, InstructionSet, CategoryMetadata } from '../types/instructions';
import { LegalCategory } from '../types';

class InstructionService {
  private instructions: Map<string, Instruction>;
  private instructionSets: Map<string, InstructionSet>;
  private categoryMetadata: Map<string, CategoryMetadata>;

  constructor() {
    this.instructions = new Map();
    this.instructionSets = new Map();
    this.categoryMetadata = new Map();
    this.initializeInstructions();
  }

  private initializeInstructions() {
    // Base instructions for all categories
    const baseInstructions: Instruction[] = [
      {
        id: 'base-accuracy',
        category: 'all',
        content: 'Always provide accurate, verifiable information based on official Bahrain legal sources.',
        priority: 100,
        isActive: true,
        language: 'en',
        tags: ['accuracy', 'verification'],
        lastUpdated: new Date()
      },
      {
        id: 'base-clarity',
        category: 'all',
        content: 'Provide clear, concise responses that are easy to understand.',
        priority: 90,
        isActive: true,
        language: 'en',
        tags: ['clarity', 'communication'],
        lastUpdated: new Date()
      }
    ];

    // Category-specific instructions
    const categoryInstructions: Record<LegalCategory, Instruction[]> = {
      'labour-law': [
        {
          id: 'labour-law-citations',
          category: 'labour-law',
          content: 'Always cite specific articles from the Bahrain Labour Law when providing information.',
          priority: 95,
          isActive: true,
          language: 'en',
          tags: ['citations', 'labour-law'],
          lastUpdated: new Date()
        },
        {
          id: 'labour-law-context',
          category: 'labour-law',
          content: 'Consider both employer and employee perspectives when discussing labour law issues.',
          priority: 85,
          isActive: true,
          language: 'en',
          tags: ['context', 'labour-law'],
          lastUpdated: new Date()
        }
      ],
      'visa-services': [
        {
          id: 'visa-requirements',
          category: 'visa-services',
          content: 'Clearly state all required documents and eligibility criteria for visa applications.',
          priority: 95,
          isActive: true,
          language: 'en',
          tags: ['requirements', 'visa'],
          lastUpdated: new Date()
        }
      ],
      'lmra': [
        {
          id: 'lmra-procedures',
          category: 'lmra',
          content: 'Provide step-by-step guidance for LMRA procedures and requirements.',
          priority: 95,
          isActive: true,
          language: 'en',
          tags: ['procedures', 'lmra'],
          lastUpdated: new Date()
        }
      ],
      'company-formation': [
        {
          id: 'company-requirements',
          category: 'company-formation',
          content: 'Detail all requirements and steps for company registration in Bahrain.',
          priority: 95,
          isActive: true,
          language: 'en',
          tags: ['requirements', 'company'],
          lastUpdated: new Date()
        }
      ],
      'grace-period': [
        {
          id: 'grace-period-rules',
          category: 'grace-period',
          content: 'Explain grace period regulations and extension procedures clearly.',
          priority: 95,
          isActive: true,
          language: 'en',
          tags: ['rules', 'grace-period'],
          lastUpdated: new Date()
        }
      ],
      'sijilat': [
        {
          id: 'sijilat-procedures',
          category: 'sijilat',
          content: 'Provide detailed guidance on Sijilat registration and documentation requirements.',
          priority: 95,
          isActive: true,
          language: 'en',
          tags: ['procedures', 'sijilat'],
          lastUpdated: new Date()
        }
      ],
      'general-legal': [
        {
          id: 'legal-disclaimer',
          category: 'general-legal',
          content: 'Include appropriate disclaimers and recommend professional legal consultation when necessary.',
          priority: 95,
          isActive: true,
          language: 'en',
          tags: ['disclaimer', 'legal'],
          lastUpdated: new Date()
        }
      ],
      'other': [
        {
          id: 'general-guidance',
          category: 'other',
          content: 'Provide general guidance while maintaining accuracy and clarity.',
          priority: 90,
          isActive: true,
          language: 'en',
          tags: ['general', 'guidance'],
          lastUpdated: new Date()
        }
      ]
    };

    // Initialize base instructions
    baseInstructions.forEach(instruction => {
      this.instructions.set(instruction.id, instruction);
    });

    // Initialize category-specific instructions
    Object.values(categoryInstructions).forEach(categoryInsts => {
      categoryInsts.forEach(instruction => {
        this.instructions.set(instruction.id, instruction);
      });
    });

    // Initialize category metadata
    Object.keys(categoryInstructions).forEach(category => {
      this.categoryMetadata.set(category, {
        name: category,
        description: `Instructions for ${category} category`,
        requiredInstructions: [
          'base-accuracy',
          'base-clarity',
          ...categoryInstructions[category as LegalCategory].map(inst => inst.id)
        ],
        optionalInstructions: []
      });
    });
  }

  getInstructionsForCategory(category: string): string {
    const baseInstructions = Array.from(this.instructions.values())
      .filter(inst => inst.category === 'all' && inst.isActive)
      .sort((a, b) => b.priority - a.priority)
      .map(inst => inst.content)
      .join('\n\n');

    const categoryInstructions = Array.from(this.instructions.values())
      .filter(inst => inst.category === category && inst.isActive)
      .sort((a, b) => b.priority - a.priority)
      .map(inst => inst.content)
      .join('\n\n');

    return `${baseInstructions}\n\n${categoryInstructions}`;
  }

  getAllInstructions(): Instruction[] {
    return Array.from(this.instructions.values());
  }

  getInstruction(id: string): Instruction | undefined {
    return this.instructions.get(id);
  }

  updateInstruction(id: string, updates: Partial<Instruction>): boolean {
    const instruction = this.instructions.get(id);
    if (instruction) {
      this.instructions.set(id, { ...instruction, ...updates, lastUpdated: new Date() });
      return true;
    }
    return false;
  }

  addInstruction(instruction: Omit<Instruction, 'id' | 'lastUpdated'>): Instruction {
    const id = `inst-${Date.now()}`;
    const newInstruction: Instruction = {
      ...instruction,
      id,
      lastUpdated: new Date()
    };
    this.instructions.set(id, newInstruction);
    return newInstruction;
  }

  deleteInstruction(id: string): boolean {
    return this.instructions.delete(id);
  }

  getCategoryMetadata(category: string): CategoryMetadata | undefined {
    return this.categoryMetadata.get(category);
  }
}

export const instructionService = new InstructionService();
