<p align="center">
    <a href="https://www.noerdisch.de" target="_blank">
        <img src="https://cdn.rawgit.com/markusguenther/abe70d34f4a4621aed0ef504c5d0192b/raw/5bf0f3df328e58ba7aad067a56cbd1c15ef69491/logo_full.svg" width="300">
    </a>
</p>

[![Packagist](https://img.shields.io/packagist/l/noerdisch/neos-slick.svg?style=flat-square)](https://packagist.org/packages/noerdisch/neos-slick)
[![Packagist](https://img.shields.io/packagist/v/noerdisch/neos-slick.svg?style=flat-square)](https://packagist.org/packages/noerdisch/neos-slick)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Twitter Follow](https://img.shields.io/twitter/follow/noerdisch.svg?style=social&label=Follow&style=flat-square)](https://twitter.com/noerdisch) [![Greenkeeper badge](https://badges.greenkeeper.io/noerdisch/neos-slick.svg)](https://greenkeeper.io/)

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

### Disabling / Enabling feature
The Slide and the Slider element have a few mixins, which you can enable / disable to add / remove a feature.

#### Example 
If you want to disbale the autoplay option in the backend, you can do this:

```yaml
'Noerdisch.Slick:Content.Slider':
  superTypes:
    'Noerdisch.Slick:Mixin.Autoplay': false
```

#### `Noerdisch.Slick:Content.Slider` Mixins
| Mixin                                 | Default value | Description              |
|---------------------------------------|---------------|--------------------------|
| Noerdisch.Slick:Mixin.Autoplay        | true          | Autoplay option          |
| Noerdisch.Slick:Mixin.SlidesToScroll  | true          | How many slides scroll   |
| Noerdisch.Slick:Mixin.Infinite        | true          | Infinite scrolling       |
| Noerdisch.Slick:Mixin.Draggable       | true          | Draggable                |
| Noerdisch.Slick:Mixin.PauseOnHover    | true          | Pause on hover           |
| Noerdisch.Slick:Mixin.AnimationSpeed  | true          | Animation speed          |
| Noerdisch.Slick:Mixin.Fade            | false         | Fade                     |
| Noerdisch.Slick:Mixin.Arrows          | true          | Arrows shown             |
| Noerdisch.Slick:Mixin.Dots            | false         | Dots shown               |
| Noerdisch.Slick:Mixin.SlidesToShow    | true          | Slide shown at once      |
| Noerdisch.Slick:Mixin.AdditionalClass | true          | Additional CSS-Class     |
| Noerdisch.Slick:Mixin.Repsonsive.Sm   | true          | Responsive group mobile  |
| Noerdisch.Slick:Mixin.Repsonsive.Md   | true          | Responsive group tablet  |
| Noerdisch.Slick:Mixin.Repsonsive.Lg   | true          | Responsive group laptop  |
| Noerdisch.Slick:Mixin.Repsonsive.Xl   | true          | Responsive group desktop |

#### `Noerdisch.Slick:Content.Slide` Mixins

| Mixin                                 | Default value | Description                |
|---------------------------------------|---------------|----------------------------|
| Noerdisch.Slick:Mixin.BackgroundImage | true          | Background iamge for Slide |
| Noerdisch.Slick:Mixin.AdditionalClass | true          | Additional CSS-Class       |

### Fade option
The fade options is disabled by default, because if you enable fade, the slides to show options isn't working. But you can simply enable it like this:

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

## Contribution

We'd love you to contribute to neos-slick. We try to make it as easy as possible.
We are using semantic-release to have more time to concentrate on important stuff
instead of struggling in the dependency or release hell.

Therefore the first rule is to follow the [eslint commit message guideline](https://github.com/conventional-changelog-archived-repos/conventional-changelog-eslint/blob/master/convention.md).
It is really easy, when you always commit via `yarn commit`. Commitizen will guide you.

All PRs will be merged into the master branch. Travis and semantic release will check the commit messages and start
building a new release when the analysis of the latest commits will trigger that.

If you have questions just ping us on twitter or github.

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.
