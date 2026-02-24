using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class City : EntityBase<int> {
        public string Name { get; set; }
        public string CountryId { get; set; }
    }
}
