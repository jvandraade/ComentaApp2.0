using System.Data;
using ComentaApp.Application.DTOs.Complaint;
using FluentValidation;

namespace ComentaApp.Application.Validators
{
  public class CreateComplaintValidator : AbstractValidator<CreateComplaintDto>
  {
    CreateComplaintValidator()
    {
      RuleFor(x => x.Title)
      .NotEmpty().WithMessage("Title is required")
      .MaximumLength(200).WithMessage("Title cannot exceed 200 characters");

      RuleFor(x => x.Description)
      .NotEmpty().WithMessage("Description is required")
      .MaximumLength(2000).WithMessage("Description cannot exceed 2000 characters");

      RuleFor(x => x.Address)
      .NotEmpty().WithMessage("Address is required")
      .MaximumLength(500).WithMessage("Address cannot exceed 500 characters");

      RuleFor(x => x.CategoryId)
      .NotEmpty().WithMessage("Category is required");
    }
  }
}
