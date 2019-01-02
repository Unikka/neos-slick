<?php
namespace Unikka\Slick\Fusion;

/*
 * This file is part of the Neos Slick package.
 *
 * (c) unikka
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Neos\Flow\Exception;
use Neos\Fusion\FusionObjects\AbstractFusionObject;

class ConvertJsonImplementation extends AbstractFusionObject
{

    /**
     * @return false|string
     * @throws Exception
     */
    public function evaluate()
    {
        $array = $this->fusionValue('value');

        if (!is_array($array)) {
            throw new Exception(sprintf('Only array can be processed by this Fusion object, given: "%s".', gettype($array)), 1536828313);
        }

        return \json_encode($array);
    }
}
