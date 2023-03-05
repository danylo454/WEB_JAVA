package shop.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;
import shop.entities.CategoryEntity;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(source = "description", target = "description")
    CategoryItemDTO categoryItemDTO(CategoryEntity category);
    List<CategoryItemDTO> categoryItemDTOList(List<CategoryEntity> categories);
    CategoryEntity categoryEntityByCategoryCreateDTO(CategoryCreateDTO category);
    CategoryEntity categoryEntityByCategoryUpdateDTO(CategoryUpdateDTO category);
}