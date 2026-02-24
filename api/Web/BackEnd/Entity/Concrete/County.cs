using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class County : EntityBase<int> {
        public string Name { get; set; }
        public int CityId { get; set; }
    }
}
