namespace ComentaApp.Application.DTOs.Complaint
{
    public class SearchComplaintDto
    {
        public string? Keyword { get; set; }
        public Guid? CategoryId { get; set; }
        public string? Status { get; set; }
        public string? State { get; set; }
        public string? City { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class PaginatedResponseDto<T>
    {
        public List<T> Data { get; set; } = new();
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public bool HasNextPage { get; set; }
        public bool HasPreviousPage { get; set; }
    }
}
