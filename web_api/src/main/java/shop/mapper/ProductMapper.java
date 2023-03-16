package shop.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.dto.product.ProductItemDTO;
import shop.entities.ProductEntity;


import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "category.name", target = "category")
    ProductItemDTO productItemDTO(ProductEntity productEntity);
    List<ProductItemDTO> productsItemDTOList(List<ProductEntity> products);
}
