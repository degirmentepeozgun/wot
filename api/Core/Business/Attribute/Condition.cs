namespace Core.BusinessTemplates.Attribute {
    [AttributeUsage(AttributeTargets.Property, Inherited = false)]
    public class Condition : System.Attribute {
        public bool Escape {
            get; set;
        }
        public bool IsArray {
            get; set;
        }
		public bool IsWildCard {
			get; set;
		}
		public int Max {
            get; set;
        }
        public int Min {
            get; set;
        }
        public int MaxLength {
            get; set;
        }
        public string? Operator {
            get; set;
        }
        public string? Name {
            get; set;
        }
        public string? Query {
            get; set;
        }
        public bool Required {
            get; set;
        }
        public string? Func {
            get; set;
        }
    }
}
