# fractal_clothing
The project of a constructor of fashion design based on fractals. The user can change the scale, color and position of the fractal, choosing a unique design for several types of clothing. The project is under development and functional additions.  

## Description of methods of the Mandelbrot class
- `type_cl(type)` – for processing the selection of the type of clothing (type parameter - selected type);
- `imag()` - for drawing a clothing stencil in canvas.
- `palette()` - to generate a color palette and change it by the user;
- `hexToRgb(hex)` – to convert colors from HEX format to RGB format (hex parameter – color in HEX format);
- `redraw()` - to redraw the window when moving/scaling the fractal and changing colors;
- `mandel(x, y)` - for calculating the Mandelbrot fractal (parameters x, y are the abscissa and ordinate of the starting point, respectively);
- `pset(x, y, k)` - filling in the data in the ImageData object about 1 pixel (parameters x, y - pixel coordinates, k - color parameter);
- `click(e)` - to handle mouse (for moving) and keyboard (for zooming) events.  

## Demonstration of the work

## Examples of clothing
![T-shirt](/img_for_readme/1.png)
![Longsleeve](/img_for_readme/2.png)
![Dress](/img_for_readme/3.png)
![Hoodies](/img_for_readme/4.png)
![ShopperBag](/img_for_readme/5.png)
