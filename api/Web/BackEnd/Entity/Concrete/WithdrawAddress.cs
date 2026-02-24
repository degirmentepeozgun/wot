using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class WithdrawAddress : EntityBase<string?> {
		public string WithdrawId {
			get; set;
		}
		public string? Name {
			get; set;
		}
		public string? Phone {
			get; set;
		}
		public string Country {
			get; set;
		}
		public string City {
			get; set;
		}

		public string County {
			get; set;
		}

		public string Address {
			get; set;
		}

		public string? Title {
			get; set;
		}

		public string? CitizenNo {
			get; set;
		}

		public string? TaxOffice {
			get; set;
		}

		public string? TaxNumber {
			get; set;
		}
	}
}
