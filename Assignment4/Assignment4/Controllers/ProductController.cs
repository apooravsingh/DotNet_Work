using Assignment4.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;


namespace Assignment4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductContext _context;

        public ProductController(ProductContext context)
        {
            _context = context;

            if (_context.ProductList.Count() == 0)
            {
                // Create a new Product if collection is empty,
                // which means you can't delete all Products.
                _context.ProductList.Add(new Product { Name = "iPhoneX", IsAvailable=true });
                _context.ProductList.Add(new Product { Name = "MacBook Pro 2018", IsAvailable = true });
                _context.ProductList.Add(new Product { Name = "iPad Pro", IsAvailable = true });
                _context.ProductList.Add(new Product { Name = "Poco Phone", IsAvailable = true });
                _context.ProductList.Add(new Product { Name = "Razor Phone", IsAvailable = true });
                _context.ProductList.Add(new Product { Name = "One Plus 5X", IsAvailable = true });
                _context.ProductList.Add(new Product { Name = "Samsung Galaxy Note 9", IsAvailable = true });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<List<Product>> GetAll()
        {
            return _context.ProductList.ToList();
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public ActionResult<Product> GetById(long id)
        {
            var product = _context.ProductList.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpPost]
        public IActionResult Create(Product product)
        {
            _context.ProductList.Add(product);
            _context.SaveChanges();

            return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, Product item)
        {
            var product = _context.ProductList.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            product.IsAvailable = item.IsAvailable;
            product.Name = item.Name;

            _context.ProductList.Update(product);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var product = _context.ProductList.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.ProductList.Remove(product);
            _context.SaveChanges();
            return NoContent();
        }
    }
}