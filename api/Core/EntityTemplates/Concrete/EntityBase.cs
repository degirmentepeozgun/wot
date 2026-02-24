using Core.EntityTemplates.Abstract;

namespace Core.EntityTemplates.Concrete {
	public class EntityBase<T> : Entity, IEntity {
        public T Id {
            get; set;
        }
    }
}
