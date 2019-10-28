<?php
namespace Unikka\Slick\Aspects;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Aop\JoinPointInterface;
use Neos\Neos\Ui\Domain\Model\Feedback\Messages\Success;
use Neos\Neos\Ui\Domain\Model\FeedbackCollection;
use Neos\Neos\Ui\Domain\Model\FeedbackInterface;
use Neos\Neos\Ui\Domain\Model\Feedback\Operations\ReloadDocument;
use Neos\Neos\Ui\Domain\Model\Feedback\Operations\ReloadContentOutOfBand;
use Neos\Neos\Ui\Domain\Model\Feedback\Operations\RenderContentOutOfBand;
use Neos\Neos\Ui\Domain\Model\Feedback\Operations\RemoveNode;
use TYPO3Fluid\Fluid\Core\Parser\SyntaxTree\NodeInterface;

/**
 * @Flow\Scope("singleton")
 * @Flow\Aspect
 */
class BackendFeedbackCollectionAugmentationAspect
{
    /**
     * @Flow\Around("method(Neos\Neos\Ui\Domain\Model\FeedbackCollection->add())")
     * @param JoinPointInterface $joinPoint The current join point
     * @return mixed
     */
    public function replacePartialReloadsInCertainConditions(JoinPointInterface $joinPoint)
    {
        /**
         * @var FeedbackInterface $feedback
         */
        $feedback = $joinPoint->getMethodArgument('feedback');

        /**
         * @var FeedbackCollection $feedbackCollection
         */
        $feedbackCollection = $joinPoint->getProxy();

        if ($feedback instanceof RenderContentOutOfBand) {
            $node = $feedback->getNode();
            $parentNode = $node->getParent();

            if ($parentNode->getNodeType()->isOfType('Unikka.Slick:Content.Slide')) {
                $parentNode = $parentNode->getParent();
            }

            // check wether the node or one of the parents up until the documents has the option reloadWithDocument set
            // if so replace the given feedback with ReloadDocument feedback
            if ($parentNode && !$parentNode->getNodeType()->isOfType('Neos.Neos:Document') && $parentNode->getNodeType()->getConfiguration('options.reloadPageIfSliderChanged') == TRUE) {
                $alternateFeedback = new ReloadDocument();
                $joinPoint->setMethodArgument('feedback', $alternateFeedback);
            }
        }

        if ($feedback instanceof RemoveNode) {
            $node = $feedback->getNode();
            $parentNode = $node->getParent();

            if ($parentNode->getNodeType()->isOfType('Unikka.Slick:Content.Slide')) {
                $parentNode = $parentNode->getParent();
            }

            // check wether the node or one of the parents up until the documents has the option reloadWithDocument set
            // if so replace the given feedback with ReloadDocument feedback
            if ($parentNode && !$parentNode->getNodeType()->isOfType('Neos.Neos:Document') && $parentNode->getNodeType()->getConfiguration('options.reloadPageIfSliderChanged') == TRUE) {
                $additionalFeedback = new ReloadDocument();
                $joinPoint->setMethodArgument('feedback', $feedback);
                $joinPoint->getProxy()->add($additionalFeedback);
            }
        }
        return $joinPoint->getAdviceChain()->proceed($joinPoint);
    }

}
