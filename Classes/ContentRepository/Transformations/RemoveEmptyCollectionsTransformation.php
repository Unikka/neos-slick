<?php

namespace Unikka\Slick\ContentRepository\Transformations;

use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\ContentRepository\Domain\Model\NodeData;
use Neos\ContentRepository\Migration\Transformations\AbstractTransformation;
use Neos\Neos\Controller\CreateContentContextTrait;

/**
 * Remove empty content collections of the slide
 */
class RemoveEmptyCollectionsTransformation extends AbstractTransformation
{
    use CreateContentContextTrait;

    /**
     * @param NodeData $node
     * @return boolean
     */
    public function isTransformable(NodeData $node)
    {
        $numberOfChildNodes = $node->getNumberOfChildNodes('Neos.Neos:ContentCollection', $node->getWorkspace(), $node->getDimensions());
        return ($numberOfChildNodes > 0);
    }

    /**
     * @param NodeData $node
     * @return void
     */
    public function execute(NodeData $node)
    {
        $contentContext = $this->createContentContext('live', []);
        $slideNode = $contentContext->getNodeByIdentifier($node->getIdentifier());
        $contentCollections = $slideNode->getChildNodes('Neos.Neos:ContentCollection');

        foreach ($contentCollections as $contentCollection) {
            /** @var NodeInterface $contentCollection */
            if ($contentCollection->hasChildNodes() === false) {
                $contentCollection->remove();
            }
        }
    }
}
