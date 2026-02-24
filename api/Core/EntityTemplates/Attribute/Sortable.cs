namespace Core.EntityTemplates.Attribute {
	[AttributeUsage(AttributeTargets.Property, Inherited = false)]
    public class Sortable : System.Attribute {
        public bool Default {
            get; set;
        }
		//true ise A dan Z ye değil ise Z den A ya
		public bool Direction {
			get; set;
		}
	}
}
