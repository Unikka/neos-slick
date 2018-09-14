<?php
namespace Noerdisch\Slick\Eel\Helper;

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
