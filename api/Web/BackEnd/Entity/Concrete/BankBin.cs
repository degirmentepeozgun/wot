using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class BankBin : EntityBase<string?> {
        public string Bin { get; set; }
    }
}
