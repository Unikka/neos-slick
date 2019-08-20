<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/unikka/unikka.de/src/assets/unikka_with_background.svg" width="300" />
</p>

[![Packagist](https://img.shields.io/packagist/l/unikka/neos-slick.svg?style=flat-square)](https://packagist.org/packages/unikka/neos-slick)
[![Packagist](https://img.shields.io/packagist/v/unikka/neos-slick.svg?style=flat-square)](https://packagist.org/packages/unikka/neos-slick)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/unikka/neos-slick.svg)](https://greenkeeper.io/)

# Slick Content Element for Neos CMS 

This is a ready-to-use implementation of the JavaScript package [slick](http://kenwheeler.github.io/slick/). 

## Installation
Most of the time you have to make small adjustments to a package (e.g., the configuration in Settings.yaml). Because of that, it is important to add the corresponding package to the composer manifest in your theme package. Mostly this is the site package located under `Packages/Sites/`. To install it correctly, go to your theme package (e.g. `Packages/Sites/Foo.Bar`) and run following command:

```bash
composer require unikka/neos-slick --no-update
```

The --no-update command prevents the automatic update of the dependencies. After the package was added to your theme `composer.json`, go back to the root of the Neos installation and run composer update. Your desired package is now installed correctly.

## Usage
This package uses background images as slides. If you want to use a fixed height for the slider you can use the following CSS:

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

### Disabling / enabling features

The Slide and the Slider element have a few mixins, which you can use to enable/disable and to add/remove a feature.

#### Example 
If you want to disable the autoplay option in the backend, you can do this:

```yaml
'Unikka.Slick:Content.Slider':
  superTypes:
    'Unikka.Slick:Mixin.Autoplay': false
```

#### `Unikka.Slick:Content.Slider` Mixins
| Mixin                                 | Default value | Description              |
|---------------------------------------|---------------|--------------------------|
| Unikka.Slick:Mixin.Autoplay        | true          | Autoplay option          |
| Unikka.Slick:Mixin.SlidesToScroll  | true          | How many slides scroll   |
| Unikka.Slick:Mixin.Infinite        | true          | Infinite scrolling       |
| Unikka.Slick:Mixin.Draggable       | true          | Draggable                |
| Unikka.Slick:Mixin.PauseOnHover    | true          | Pause on hover           |
| Unikka.Slick:Mixin.AnimationSpeed  | true          | Animation speed          |
| Unikka.Slick:Mixin.Fade            | false         | Fade                     |
| Unikka.Slick:Mixin.Arrows          | true          | Arrows shown             |
| Unikka.Slick:Mixin.Dots            | false         | Dots shown               |
| Unikka.Slick:Mixin.SlidesToShow    | true          | Number of slides shown at once |
| Unikka.Slick:Mixin.AdditionalClass | true          | Additional CSS-Class     |
| Unikka.Slick:Mixin.Repsonsive.Sm   | true          | Responsive group mobile  |
| Unikka.Slick:Mixin.Repsonsive.Md   | true          | Responsive group tablet  |
| Unikka.Slick:Mixin.Repsonsive.Lg   | true          | Responsive group laptop  |
| Unikka.Slick:Mixin.Repsonsive.Xl   | true          | Responsive group desktop |

#### `Unikka.Slick:Content.Slide` Mixins

| Mixin                                 | Default value | Description                |
|---------------------------------------|---------------|----------------------------|
| Unikka.Slick:Mixin.BackgroundImage | true          | Background image for Slide |
| Unikka.Slick:Mixin.AdditionalClass | true          | Additional CSS-Class       |

### Fade option
The fade options is disabled by default, because if you enable fade, the "slides to show" option isn't working. But you can simply enable it like this:

```yaml
'Unikka.Slick:Content.Slider':
  superTypes:
    'Unikka.Slick:Mixin.Fade': true 
    'Unikka.Slick:Mixin.SlidesToShow': false
```

## Configuration

```yaml
Unikka:
  Slick:
    # include the theme css file from slick
    theme: true
    backend:
      # disables autoplay in backend
      disableAutoplay: true
    # breakpoints for the responsive tab
    responsive:
      sm: 576px
      md: 768px
      lg: 992px
      xl: 1200px

```

## Contribution

We'd love you to contribute to neos-slick. We try to make it as easy as possible.
We are using semantic versioning to have more time to concentrate on important stuff
instead of struggling in the dependency or release hell.

Therefore the first rule is to follow the [eslint commit message guideline](https://github.com/conventional-changelog-archived-repos/conventional-changelog-eslint/blob/master/convention.md).
It is really easy if you always commit via `yarn commit`. Commitizen will guide you.

All PRs will be merged into the master branch. Travis and semantic release will check the commit messages and start
building a new release when the analysis of the latest commits will trigger that.

If you have questions just ping us on Twitter or Github.

## About

The package is based on the `Noerdisch/Slick` package. We thank the Noerdisch team for
all the efforts.

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.
