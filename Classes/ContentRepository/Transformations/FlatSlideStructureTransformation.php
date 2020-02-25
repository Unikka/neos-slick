<?php

namespace Unikka\Slick\ContentRepository\Transformations;

use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\Flow\Annotations as Flow;
use Neos\ContentRepository\Domain\Model\NodeData;
use Neos\ContentRepository\Domain\Service\NodeTypeManager;
use Neos\ContentRepository\Migration\Transformations\AbstractTransformation;
use Neos\Neos\Controller\CreateContentContextTrait;

/**
 * Move content of slide content collections to the slide
 */
class FlatSlideStructureTransformation extends AbstractTransformation
{
    use CreateContentContextTrait;

    /**
     * @Flow\Inject
     * @var NodeTypeManager
     */
    protected $nodeTypeManager;

    /**
     * @Flow\Inject
     * @var \Neos\ContentRepository\Domain\Service\ContextFactoryInterface
     */
    protected $contextFactory;

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
     * @throws \Neos\Eel\Exception
     */
    public function execute(NodeData $node)
    {
        $contentContext = $this->createContentContext('live', []);
        $slideNode = $contentContext->getNodeByIdentifier($node->getIdentifier());

        /** @var NodeInterface $contentCollection */
        $contentCollections = $slideNode->getChildNodes('Neos.Neos:ContentCollection');

        foreach ($contentCollections as $contentCollection) {
            if ($contentCollection->hasChildNodes()) {
                $this->moveChildNodesToSlide($contentCollection->getChildNodes(), $slideNode);
            }

            $contentCollection->setHidden(true);
        }
    }

    protected function moveChildNodesToSlide($children, NodeInterface $slide) {
        foreach ($children as $childNode) {
            /** @var NodeInterface $childNode */
            $childNode->moveInto($slide);
        }
    }
}
