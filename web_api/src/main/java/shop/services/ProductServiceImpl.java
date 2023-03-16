package shop.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import shop.dto.ServiceResponseDto;
import shop.dto.product.ProductCreateDTO;
import shop.dto.product.ProductEditDTO;
import shop.dto.product.ProductItemDTO;
import shop.entities.CategoryEntity;
import shop.entities.ProductEntity;
import shop.entities.ProductImageEntity;
import shop.interfaces.ProductService;
import shop.mapper.ProductMapper;
import shop.repositories.ProductImageRepository;
import shop.repositories.ProductRepository;
import shop.storage.StorageService;

import java.util.ArrayList;
import java.util.Date;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productyRepository;
    private final ProductImageRepository productImageRepository;
    private final StorageService storageService;
    private final ProductMapper productMapper;

    @Override
    public ServiceResponseDto edit(int id, ProductEditDTO model) {
        var p = productyRepository.findById(id);
        if (p.isPresent()) {
            var product = p.get();
            if (model.getRemoveFiles().size() > 0) {
                for (var name : model.getRemoveFiles()) {

                    var pi = productImageRepository.findByName(name);
                    if (pi != null) {
                        productImageRepository.delete(pi);
                        storageService.removeFile(name);
                    }
                }

            }

            var cat = new CategoryEntity();
            cat.setId(model.getCategory_id());

            product.setName(model.getName());
            product.setDescription(model.getDescription());
            product.setPrice(model.getPrice());
            product.setDateCreated(new Date());
            product.setCategory(cat);
            productyRepository.save(product);
            var productImages = product.getProductImages();
            int priority = 1;

            if (productImages.size() > 0) {
                for (var pi : productImages) {
                    if (pi.getPriority() > priority)
                        priority = pi.getPriority();
                }
                priority++;
            }

            if (model.getFiles().size() > 0) {
                for (var img : model.getFiles()) {
                    var file = storageService.saveMultipartFile(img);
                    ProductImageEntity pi = new ProductImageEntity();
                    pi.setName(file);
                    pi.setDateCreated(new Date());
                    pi.setPriority(priority);
                    pi.setDelete(false);
                    pi.setProduct(product);
                    productImageRepository.save(pi);
                    priority++;
                }

            }


        }
        return new ServiceResponseDto("Successful request update product");
    }

    @Override
    public ServiceResponseDto getById(int id) {
        var productOptinal = productyRepository.findById(id);
        if (productOptinal.isPresent()) {
            var product = productOptinal.get();
            var data = productMapper.productItemDTO(product);
            for (var img : product.getProductImages())
                data.getFiles().add(img.getName());
            return new ServiceResponseDto("Successful request get product", data);
        }
        return new ServiceResponseDto("Bad request get product");
    }

    @Override
    public ServiceResponseDto delete(int id) {
        try {
            ProductEntity product = productyRepository.findById(id).get();
            var productImages = product.getProductImages();
            var itemsImages = new ArrayList<String>();
            for (var img : productImages) {
                productImageRepository.deleteById(img.getId());
                storageService.removeFile(img.getName());
            }
            productyRepository.deleteById(id);

            return new ServiceResponseDto("Successful request delete product");
        } catch (Exception ex) {
            return new ServiceResponseDto(ex.getMessage());
        }
    }

    @Override
    public ServiceResponseDto create(ProductCreateDTO model) {
        try {
            var category = new CategoryEntity();
            category.setId(model.getCategory_id());
            var product = new ProductEntity();
            product.setName(model.getName());
            product.setDescription(model.getDescription());
            product.setPrice(model.getPrice());
            product.setDateCreated(new Date());
            product.setCategory(category);
            product.setDelete(false);
            productyRepository.save(product);
            if (model.getFiles() != null) {
                int priority = 1;
                for (var img : model.getFiles()) {
                    var file = storageService.saveMultipartFile(img);
                    ProductImageEntity pi = new ProductImageEntity();
                    pi.setName(file);
                    pi.setDateCreated(new Date());
                    pi.setPriority(priority);
                    pi.setDelete(false);
                    pi.setProduct(product);
                    productImageRepository.save(pi);
                    priority++;
                }

            }

            return new ServiceResponseDto("Successful request create product");

        } catch (Exception ex) {
            return new ServiceResponseDto(ex.getMessage().toString());
        }

    }

    @Override
    public ServiceResponseDto getProductsCategory(int idCategory) {
        try {
            var data = productyRepository.findAll();
            var listResponse = new ArrayList<ProductItemDTO>();
            for (var product : data) {
                if (product.getCategory().getId() == idCategory) {
                    ProductItemDTO productItemDTO = new ProductItemDTO();
                    productItemDTO.setId(product.getId());
                    productItemDTO.setName(product.getName());
                    productItemDTO.setCategory(product.getCategory().getName());
                    productItemDTO.setPrice(product.getPrice());
                    productItemDTO.setDescription(product.getDescription());
                    var listImages = new ArrayList<String>();
                    for (var img : product.getProductImages()) {
                        listImages.add(img.getName());
                    }
                    productItemDTO.setFiles(listImages);
                    listResponse.add(productItemDTO);
                }

            }

            return new ServiceResponseDto("Successful request", listResponse);

        } catch (Exception ex) {
            return new ServiceResponseDto("Bad request exception:", ex.getMessage());
        }
    }
}