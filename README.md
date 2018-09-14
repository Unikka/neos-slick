# Slick Content Element for Neos CMS 
[![Latest Stable Version](https://poser.pugx.org/noerdisch/neos-slick/v/stable)](https://packagist.org/packages/noerdisch/neos-slick)
[![Downloads](https://img.shields.io/packagist/dt/noerdisch/neos-slick.svg)](https://packagist.org/packages/noerdisch/neos-slick)
[![License](https://img.shields.io/github/license/noerdisch/neos-slick.svg)](LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![GitHub stars](https://img.shields.io/github/stars/noerdisch/neos-slick.svg?style=social&label=Stars)](https://github.com/noerdisch/neos-slick/stargazers)
[![GitHub watchers](https://img.shields.io/github/watchers/noerdisch/neos-slick.svg?style=social&label=Watch)](https://github.com/noerdisch/neos-slick/subscription)

This is a ready to use implementation of the Javascript package [slick](http://kenwheeler.github.io/slick/). 

## Installation
Most of the time you have to make small adjustments to a package (e.g., the configuration in Settings.yaml). Because of that, it is important to add the corresponding package to the composer from your theme package. Mostly this is the site package located under Packages/Sites/. To install it correctly go to your theme package (e.g.Packages/Sites/Foo.Bar) and run following command:

```bash
composer require noerdisch/neos-slick --no-update
```

The --no-update command prevent the automatic update of the dependencies. After the package was added to your theme composer.json, go back to the root of the Neos installation and run composer update. Your desired package is now installed correctly.

## Usage
This package uses background images as slide.  If you want to use a fixed height for the slider you can use this as CSS:

```css
.slick-slide {
    min-height: <your-slide-height>;
}
.slide__inner {
    height: 100%;
    width: 100%;
    position: absolute;
}
```

### Fade option
The fade options is disabled by default, because if you enable fade, the slides to show options isnt working. But you can simply enable it like this:

```yaml
'Noerdisch.Slick:Content.Slider':
  superTypes:
    'Noerdisch.Slick:Mixin.Fade': true 
    'Noerdisch.Slick:Mixin.SlidesToShow': false
```

## Configuration

```yaml
Noerdisch:
  Slick:
    # include the theme css file form slick
    theme: true
    backend:
      # disables autoplay in backend
      disableAutoplay: true
    # breakpoints for the repsonsive tab
    responsive:
      sm: 576px
      md: 768px
      lg: 992px
      xl: 1200px

```

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.
