package shop.interfaces;

import shop.dto.ServiceResponseDto;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryItemDTO> get();
    String delete(int id);
    ServiceResponseDto create(CategoryCreateDTO model);
    CategoryItemDTO getById(int id);
    ServiceResponseDto update(CategoryUpdateDTO model);


}
