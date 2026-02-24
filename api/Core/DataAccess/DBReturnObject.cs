namespace Core.DataAccess
{
    public class DBReturnObject<T>
    {
		public int TotalCount
		{
			get; set;
		}
		public T? Data
		{
			get; set;
		}
	}
}
