package shop.services;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import shop.dto.ServiceResponseDto;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;
import shop.entities.CategoryEntity;
import shop.interfaces.CategoryService;
import shop.mapper.CategoryMapper;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepository;
    private final StorageService storageService;

    @Override
    public List<CategoryItemDTO> get() {
        var data = categoryRepository.findAll();
        var list = categoryMapper.categoryItemDTOList(data);
        return list;
    }

    @Override
    public String delete(int id) {
        CategoryEntity category = categoryRepository.findById(id).get();
        storageService.removeFile(category.getImage());
        categoryRepository.deleteById(id);
        return "Катагорія знищена.";
    }

    @Override
    public ServiceResponseDto create(CategoryCreateDTO model) {
        if (model != null) {
            var newCategory = categoryMapper.categoryEntityByCategoryCreateDTO(model);
            if (model.getFile()!= null) {
                var fileName = storageService.saveMultipartFile(model.getFile());
                newCategory.setImage(fileName);
            }
            categoryRepository.save(newCategory);
            return new ServiceResponseDto("Successful request", newCategory);

        } else {
            return new ServiceResponseDto("Bad request", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public CategoryItemDTO getById(int id) {
        return null;
    }

    @Override
    public ServiceResponseDto update(CategoryUpdateDTO model) {
        CategoryEntity tempCategory = categoryRepository.findById(model.getId()).get();
        if (tempCategory != null) {
            var categoryToUpdate = categoryMapper.categoryEntityByCategoryUpdateDTO(model);
            String file = model.getNewImage();
            if (file != null) {
                var fileName = storageService.save(file);
                categoryToUpdate.setImage(fileName);
                storageService.removeFile(tempCategory.getImage());
            } else {
                categoryToUpdate.setImage(tempCategory.getImage());
            }
            categoryRepository.save(categoryToUpdate);
            return new ServiceResponseDto("Category successfully updated !", categoryToUpdate);

        } else {
            return new ServiceResponseDto("Category with id: " + model.getId() + " not exist!");
        }
    }


}
