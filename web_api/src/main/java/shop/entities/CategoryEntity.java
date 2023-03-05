package shop.entities;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name="tbl_categories")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 500, nullable = false)
    private String name;
    @Column(length = 300)
    private String image;
    @Column(length = 4000)
    private String description;
    @OneToMany(mappedBy = "category")
    private List<ProductEntity> products;
}