using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Web.BackEnd.Entity.Concrete {
	public class PortalPackage : EntityBase<string> {
		[Sortable]
		[RegularExpression(@"^[^<>]{0,100}$", ErrorMessage = "Ad : {0}, en fazla 100 karakter uzunluğunda olabilir")]
		public string Name {
			get; set;
		}
		public int MinAge {
			get; set;
		}
		public int MaxAge {
			get; set;
		}
		public string? ListOwnerId {
			get; set;
		}
		[Sortable]
		public DateTime PublishStartDate {
			get; set;
		}
		[Sortable]
		public DateTime PublishEndDate {
			get; set;
		}
		public double SecondsLeftToStart {
			get {
				DateTime now = DateTime.Now;
				if(now < PublishStartDate)
					return (PublishStartDate - now).TotalSeconds;
				return 0;
			}
		}
		public double SecondsLeftToEnd {
			get {
				DateTime now = DateTime.Now;
				if(now < PublishEndDate)
					return (PublishEndDate - now).TotalSeconds;
				return 0;
			}
		}
		
		public string? Description {
			get; set;
		}
		[JsonIgnore]
		public string? Keywords {
			get; set;
		}
		[Sortable]
		public decimal Month3Price {
			get; set;
		}
		[Sortable]
		public decimal Month6Price {
			get; set;
		}
		[Sortable]
		public decimal Month12Price {
			get; set;
		}
		[Sortable]
		public decimal TotalPrintedPrice {
			get; set;
		}

        public int Adventage {
			get {
				var av = Math.Ceiling((TotalPrintedPrice <= Month12Price ? 0 : (1 - (Month12Price / TotalPrintedPrice)) * 100));
				if(av % 5 > 0)
					av += (5 - (av % 5));
				if(av >= 100)
					av = 95;
				return (int)av;
			}
		}
        public bool IsExtendable => (this.Flags & 1) > 0;
        public int BookCount { get; set; }
    }
}
