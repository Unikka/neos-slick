<p align="center">
    <a href="https://www.noerdisch.de" target="_blank">
        <img src="https://cdn.rawgit.com/markusguenther/abe70d34f4a4621aed0ef504c5d0192b/raw/5bf0f3df328e58ba7aad067a56cbd1c15ef69491/logo_full.svg" width="300">
    </a>
</p>

[![Packagist](https://img.shields.io/packagist/l/noerdisch/neos-slick.svg?style=flat-square)](https://packagist.org/packages/noerdisch/elasticlog)
[![Packagist](https://img.shields.io/packagist/v/noerdisch/neos-slick.svg?style=flat-square)](https://packagist.org/packages/noerdisch/elasticlog)
[![License](https://img.shields.io/github/license/noerdisch/neos-slick.svg)](LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Twitter Follow](https://img.shields.io/twitter/follow/noerdisch.svg?style=social&label=Follow&style=flat-square)](https://twitter.com/noerdisch)

# Slick Content Element for Neos CMS 

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
