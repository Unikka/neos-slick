<?php
namespace Noerdisch\Slick\Eel\Helper;

/*
 * This file is part of the Noerdisch.Slick package.
 *
 * (c) Noerdisch - Digital Solutions www.noerdisch.com
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\Eel\ProtectedContextAwareInterface;

class SlickEelHelper implements ProtectedContextAwareInterface
{

    /**
     * Returns all given properties as array
     *
     * @param NodeInterface $node
     * @param $properties array
     * @return array
     */
    public function getPropertiesByKeys(NodeInterface $node, $properties)
    {
        return $this->keyValuesIntersect($node->getProperties(), $properties);
    }

    /**
     * @param $values
     * @param $keys
     * @return array
     */
    protected function keyValuesIntersect($values, $keys)
    {
        $intersection = [];

        foreach ($keys as $key) {
            if (isset($values[$key])) {
                $intersection[$key] = $values[$key];
            }
        }

        return $intersection;
    }

    /**
     * All methods are considered safe, i.e. can be executed from within Eel
     *
     * @param string $methodName
     * @return boolean
     */
    public function allowsCallOfMethod($methodName)
    {
        return true;
    }

}
