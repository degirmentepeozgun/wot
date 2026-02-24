using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class MultiLangData : EntityBase<Guid> {
		public string ItemId { get; set; }
        public string TableName { get; set; }
        public string PropertyName { get; set; }
        public string LangCode { get; set; }
        public string Value { get; set; }
    }
}
