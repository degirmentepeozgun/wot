namespace Web.BackEnd.Entity.Concrete {

	public class PopularItem {
		public List<string>? Authors {
			get; set;
		}
		public int Count {
			get; set;
		}
		public string Id {
			get; set;
		}
	}
	public class PopularSearchItem : PopularSearchItemBase {
        public int Count {
			get; set;
		}
		public string Id {
			get; set;
		}
	}
	public class PopularSearchItemBase {
        public List<PopularSearchItemStat> Stats { get; set; }
    }

	public class PopularSearchItemStat {
		public DateTime Date {
			get; set;
		}
        public int Quantity { get; set; }	
    }
}
