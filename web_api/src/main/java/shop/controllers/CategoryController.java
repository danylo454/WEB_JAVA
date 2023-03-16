package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.ServiceResponseDto;
import shop.dto.UploadImageDto;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;
import shop.entities.CategoryEntity;
import shop.interfaces.CategoryService;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;
    private final StorageService storageService;
    private final CategoryService categoryService;

    @GetMapping("/")
    public List<CategoryItemDTO> index() {
        //categoryDTOList.add(new CategoryDTO("Сало"));
        return categoryService.get();
    }

    @PutMapping("updateCategory")
    public ServiceResponseDto updateCategory(@RequestBody CategoryUpdateDTO model) {
        try {
            var response = categoryService.update(model);
            return  response;



        } catch (Exception ex) {
            return new ServiceResponseDto("ERORR SERVER: " + ex.getMessage().toString());
        }
    }

    @PostMapping(value = "addCategory" ,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ServiceResponseDto addCategory(@ModelAttribute CategoryCreateDTO model) {
        try {
            return categoryService.create(model);
        } catch (Exception ex) {
            return new ServiceResponseDto("Bad request", HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<CategoryItemDTO> getCagegoryById(@PathVariable("id") int categoryId) {
        var category = categoryService.getById(categoryId);
        if(category!=null)
        {
            return new ResponseEntity<>(category, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serverfile(@PathVariable String filename)
            throws Exception {
        Resource file = storageService.loadAsResource(filename);
        String urlFileName = URLEncoder.encode(filename.toString(), StandardCharsets.UTF_8.toString());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "filename=\"" + urlFileName + "\"")
                .body(file);
    }

    @PostMapping("/upload")
    public String upload(@RequestBody UploadImageDto dto) {
        String fileName = storageService.save(dto.getBase64());
        return fileName;
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int categoryId) {
        try {
            String response = categoryService.delete(categoryId);
            return new ResponseEntity(response, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity("Bad request", HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

}