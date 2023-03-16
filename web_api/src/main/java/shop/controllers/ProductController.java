package shop.controllers;


import lombok.AllArgsConstructor;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.ServiceResponseDto;
import shop.dto.product.ProductCreateDTO;

import shop.dto.product.ProductEditDTO;
import shop.dto.product.ProductItemDTO;
import shop.interfaces.ProductService;
import shop.mapper.ProductMapper;
import shop.repositories.ProductRepository;
import shop.storage.StorageService;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/products")
public class ProductController {
    private final ProductService productService;

    private final StorageService storageService;


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ServiceResponseDto create(@ModelAttribute ProductCreateDTO model) {
        var result = productService.create(model);
        return result;
    }

    @PutMapping(value = "/updateProduct/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ServiceResponseDto edit(@PathVariable("id") int id, @ModelAttribute ProductEditDTO model) {
        var result = productService.edit(id, model);
        return result;
    }

    @GetMapping("/{idCategory}")
    public ServiceResponseDto getProductsCategory(@PathVariable("idCategory") int categoryId) {

        return productService.getProductsCategory(categoryId);
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

    @GetMapping("/getProduct/{id}")
    public ServiceResponseDto getProductById(@PathVariable("id") int id) {
        var result = productService.getById(id);
        return result;
    }

    @DeleteMapping("{id}")
    public ServiceResponseDto delete(@PathVariable("id") int id) {

        var response = productService.delete(id);
        return response;

    }

}