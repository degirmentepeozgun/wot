using Core.EntityTemplates.Abstract;
using Core.EntityTemplates.Attribute;

namespace Core.EntityTemplates.Concrete {
    public class DeletableEntity<T> : EntityBase<T> {

        [IgnoreHistory]
        [IgnoreEquality]
        public ModifyActions? Action {
            get; set;
        }
    }
    
}
