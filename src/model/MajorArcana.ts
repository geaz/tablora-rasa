import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { ArcanaCard, ArcanaType } from "./Arcana";

const majorType: ArcanaType = {
  id: "trump",
  name: "Major Arcana",
  element: "none",
  icon: faBolt,
  meanings: []
};

export const MajorArcana: Array<ArcanaCard> = [
    {
      id: "trump-zero",
      name: "The Fool",
      type: majorType,
      meanings: {
        upright: ["new beginnings", "innocence", "spontaneity", "risk-taking", "freedom", "adventurousness", "optimism", "pioneering spirit"],
        reversed: ["carelessness", "naivety", "recklessness", "rebellion", "recklessness", "irresponsibility", "ignorance", "immaturity"]
      }
    },
    {
      id: "trump-one",
      name: "The Magician",
      type: majorType,
      meanings: {
        upright: ["manifestation", "power", "creativity", "self-confidence", "abilities", "initiative", "transformation", "clarification"],
        reversed: ["manipulation", "deception", "lack of energy", "inability", "self-doubt", "misuse of abilities", "stagnation", "communication problems"]
      }
    },
    {
      id: "trump-two",
      name: "The High Priestess",
      type: majorType,
      meanings: {
        upright: ["intuition", "secrets", "feminine energy", "spiritual knowledge", "depth", "inner voice", "connectedness", "wisdom"],
        reversed: ["hidden enemies", "passivity", "unconsciousness", "deception", "disregard for intuition", "superficiality", "lack of clarity", "dishonesty"]
      }
    },
    {
      id: "trump-three",
      name: "The Empress",
      type: majorType,
      meanings: {
        upright: ["feminine abundance", "creativity", "motherhood", "love", "abundance", "caring", "fertility", "harmony"],
        reversed: ["dependence", "neglect", "lack of self-care", "oppression", "selfishness", "infertility", "disharmony", "loss of control"]
      }
    },
    {
      id: "trump-four",
      name: "The Emperor",
      type: majorType,
      meanings: {
        upright: ["authority", "power", "structure", "control", "discipline", "achievement", "responsibility", "stability"],
        reversed: ["tyranny", "dominance", "rigidity", "abuse of power", "loss of control", "lack of discipline", "chaos", "instability"]
      }
    },
    {
      id: "trump-five",
      name: "The Hierophant",
      type: majorType,
      meanings: {
        upright: ["spiritual guidance", "tradition", "institution", "religion", "mentorship", "teaching", "belief system", "conformity"],
        reversed: ["rebellion against tradition", "unconventional beliefs", "challenging authority", "non-conformity", "unorthodox spiritual path", "lack of guidance"]
      }
    },
    {
      id: "trump-six",
      name: "The Lovers",
      type: majorType,
      meanings: {
        upright: ["love", "connection", "relationship", "harmony", "passion", "union", "choices", "alignment"],
        reversed: ["disharmony", "conflict", "unresolved choices", "misalignment", "separation", "unhealthy relationships", "dishonesty", "betrayal"]
      }
    },
    {
      id: "trump-seven",
      name: "The Chariot",
      type: majorType,
      meanings: {
        upright: ["victory", "control", "determination", "willpower", "progress", "confidence", "triumph", "assertiveness"],
        reversed: ["loss of control", "lack of direction", "defeat", "overconfidence", "obstacles", "lack of willpower", "conflict", "recklessness"]
      }
    },
    {
      id: "trump-eight",
      name: "Strength",
      type: majorType,
      meanings: {
        upright: ["inner strength", "courage", "patience", "compassion", "endurance", "fortitude", "resilience", "emotional control"],
        reversed: ["weakness", "fear", "lack of courage", "impatience", "vulnerability", "insecurity", "self-doubt", "emotional instability"]
      }
    },
    {
      id: "trump-nine",
      name: "The Hermit",
      type: majorType,
      meanings: {
        upright: ["introspection", "solitude", "inner guidance", "wisdom", "seeking truth", "patience", "reflection", "spiritual insight"],
        reversed: ["isolation", "loneliness", "withdrawal", "misguidance", "lost direction", "missing the point", "social withdrawal", "impatience"]
      }
    },
    {
      id: "trump-ten",
      name: "Wheel of Fortune",
      type: majorType,
      meanings: {
        upright: ["change", "cycles", "ups and downs", "fate", "destiny", "turning points", "opportunity", "luck"],
        reversed: ["bad luck", "unfavorable circumstances", "resistance to change", "cycles of life", "missed opportunities", "falling from grace", "negative events"]
      }
    },
    {
      id: "trump-eleven",
      name: "Justice",
      type: majorType,
      meanings: {
        upright: ["justice", "fairness", "balance", "truth", "law", "ethical decisions", "integrity", "accountability"],
        reversed: ["injustice", "unfairness", "imbalance", "dishonesty", "unethical behavior", "lack of accountability", "legal issues", "bias"]
      }
    },
    {
      id: "trump-twelve",
      name: "The Hanged Man",
      type: majorType,
      meanings: {
        upright: ["sacrifice", "letting go", "surrender", "new perspectives", "pause", "re-evaluation", "spiritual growth", "wisdom"],
        reversed: ["resistance to change", "stalling", "sacrifices in vain", "impatience", "unwillingness to let go", "stubbornness", "stagnation", "lack of insight"]
      }
    },
    {
      id: "trump-thirteen",
      name: "Death",
      type: majorType,
      meanings: {
        upright: ["transformation", "endings", "new beginnings", "change", "release", "renewal", "transcendence", "metamorphosis"],
        reversed: ["resistance to change", "fear of transformation", "inability to let go", "stagnation", "lingering issues", "avoidance of the inevitable", "lack of growth"]
      }
    },
    {
      id: "trump-fourteen",
      name: "Temperance",
      type: majorType,
      meanings: {
        upright: ["balance", "harmony", "moderation", "patience", "spiritual growth", "blending", "healing", "reconciliation"],
        reversed: ["imbalance", "disharmony", "extremes", "impatience", "lack of moderation", "conflict", "strained relationships", "lack of healing"]
      }
    },
    {
      id: "trump-fifteen",
      name: "The Devil",
      type: majorType,
      meanings: {
        upright: ["bondage", "materialism", "ignorance", "illusion", "addiction", "temptation", "obsession", "self-destructive patterns"],
        reversed: ["release from bondage", "spiritual awakening", "freedom", "breaking chains", "clarity", "overcoming temptation", "transformation", "liberation"]
      }
    },
    {
      id: "trump-sixteen",
      name: "The Tower",
      type: majorType,
      meanings: {
        upright: ["sudden upheaval", "disaster", "change", "release", "awakening", "revelation", "chaos", "liberation"],
        reversed: ["avoidance of disaster", "resisting change", "fear of change", "building on shaky foundations", "unraveling", "prolonging the inevitable", "delayed awakening"]
      }
    },
    {
      id: "trump-seventeen",
      name: "The Star",
      type: majorType,
      meanings: {
        upright: ["hope", "inspiration", "spiritual insight", "renewal", "optimism", "guidance", "serenity", "hopeful outcomes"],
        reversed: ["lack of hope", "despair", "discouragement", "pessimism", "disconnection from spirituality", "unfulfilled dreams", "disappointment", "lack of inspiration"]
      }
    },
    {
      id: "trump-eighteen",
      name: "The Moon",
      type: majorType,
      meanings: {
        upright: ["illusion", "intuition", "dreams", "unconscious mind", "confusion", "intuition", "mystery", "instability"],
        reversed: ["clarity", "rationality", "facing fears", "unveiling the truth", "emotional clarity", "illumination", "stability", "lack of confusion"]
      }
    },
    {
      id: "trump-nineteen",
      name: "The Sun",
      type: majorType,
      meanings: {
        upright: ["success", "vitality", "joy", "confidence", "achievement", "positivity", "abundance", "good fortune"],
        reversed: ["temporary depression", "lack of success", "negativity", "doubt", "lack of vitality", "obstacles", "disappointment", "delayed achievement"]
      }
    },
    {
      id: "trump-twenty",
      name: "Judgment",
      type: majorType,
      meanings: {
        upright: ["judgment", "rebirth", "awakening", "renewal", "reflection", "forgiveness", "accountability", "clarity"],
        reversed: ["self-judgment", "lack of self-awareness", "refusing to change", "ignoring lessons", "lack of reflection", "unforgiveness", "lack of accountability", "lack of clarity"]
      }
    },
    {
      id: "trump-twentyone",
      name: "The World",
      type: majorType,
      meanings: {
        upright: ["completion", "fulfillment", "wholeness", "achievement", "travel", "success", "celebration", "recognition"],
        reversed: ["incompletion", "lack of fulfillment", "unfinished business", "lack of closure", "unfulfilled potential", "lack of success", "missed opportunities", "lack of recognition"]
      }
    }
  ];