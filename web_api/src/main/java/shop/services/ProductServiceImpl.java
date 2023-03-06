package shop.services;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import shop.dto.product.ProductCreateDTO;
import shop.dto.product.ProductItemDTO;
import shop.entities.ProductEntity;
import shop.entities.ProductImageEntity;
import shop.interfaces.ProductService;
import shop.mapper.CategoryMapper;
import shop.repositories.CategoryRepository;
import shop.repositories.ProductImageRepository;
import shop.storage.StorageService;

import java.util.Date;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final StorageService storageService;
    private final ProductImageRepository productImageRepository;

    @Override
    public ProductItemDTO create(ProductCreateDTO model) {
        int priority= 1;
        var product = new ProductEntity();
        product.setName(model.getName());
        product.setPrice(model.getPrice());
        product.setDescription(model.getDescription());
        product.setDelete(false);
        product.setDateCreated(new Date());

        for (var img : model.getFiles()){
        var fileName = storageService.saveMultipartFile(img);
            ProductImageEntity pr = new ProductImageEntity();
            pr.setName(fileName);
            pr.setDateCreated(new Date());
            pr.setPriority(priority);
            pr.setDelete(false);
            pr.setProduct(product);
            productImageRepository.save(pr);
            priority++;
        }
        return null;
    }
}
