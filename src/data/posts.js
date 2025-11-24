// --- Content Imports ---
import WhatIsAxiomatic, { frontmatter as whatIsMeta, readTime as whatIsReadTime } from '../content/posts/what-is-axiomatic.mdx';
import BigRipples, { frontmatter as ripplesMeta, readTime as ripplesReadTime } from '../content/posts/big-ripples.mdx';
import FeatureScale, { frontmatter as featureScaleMeta, readTime as featureScaleReadTime } from '../content/posts/feature-scale-co-attention.mdx';
import Quartet, { frontmatter as quartetMeta, readTime as quartetReadTime } from '../content/posts/quartet.mdx';
import PostDarwinian, { frontmatter as darwinianMeta, readTime as darwinianReadTime } from '../content/posts/post-darwinian-frustrations.mdx';
import QuantumDeterminism, { frontmatter as quantumMeta, readTime as quantumReadTime } from '../content/posts/quantum-determinism.mdx';
import WhatIsSacred, { frontmatter as sacredMeta, readTime as sacredReadTime } from '../content/posts/what-is-sacred.mdx';
import LowEntropy, { frontmatter as entropyMeta, readTime as entropyReadTime } from '../content/posts/low-entropy-gradients.mdx';
import ComputationalGraphs, { frontmatter as graphsMeta, readTime as graphsReadTime } from '../content/posts/i-luv-computational-graphs.mdx';
import BoundlessHumanity, { frontmatter as boundlessMeta, readTime as boundlessReadTime } from '../content/posts/boundless-humanity.mdx';
import PowerVirtue, { frontmatter as powerMeta, readTime as powerReadTime } from '../content/posts/power-really-is-a-virtue.mdx';
import HierarchicalSource, { frontmatter as hierarchicalMeta, readTime as hierarchicalReadTime } from '../content/posts/hierarchical-source-attention.mdx';
import RoutingInduction, { frontmatter as routingMeta, readTime as routingReadTime } from '../content/posts/routing-as-differentiable-program-induction.mdx';

export const POSTS = [
    {
        id: 0,
        ...whatIsMeta,
        readTime: whatIsReadTime,
        component: WhatIsAxiomatic,
        slug: "what-is-axiomatic",
        pinned: true
    },
    {
        id: 1,
        ...ripplesMeta,
        readTime: ripplesReadTime,
        component: BigRipples,
        slug: "big-ripples"
    },
    {
        id: 2,
        ...featureScaleMeta,
        readTime: featureScaleReadTime,
        component: FeatureScale,
        slug: "feature-scale-co-attention"
    },
    {
        id: 3,
        ...quartetMeta,
        readTime: quartetReadTime,
        component: Quartet,
        slug: "quartet"
    },
    {
        id: 4,
        ...darwinianMeta,
        readTime: darwinianReadTime,
        component: PostDarwinian,
        slug: "post-darwinian-frustrations"
    },
    {
        id: 5,
        ...quantumMeta,
        readTime: quantumReadTime,
        component: QuantumDeterminism,
        slug: "quantum-determinism"
    },
    {
        id: 6,
        ...sacredMeta,
        readTime: sacredReadTime,
        component: WhatIsSacred,
        slug: "what-is-sacred"
    },
    {
        id: 7,
        ...entropyMeta,
        readTime: entropyReadTime,
        component: LowEntropy,
        slug: "low-entropy-gradients"
    },
    {
        id: 8,
        ...graphsMeta,
        readTime: graphsReadTime,
        component: ComputationalGraphs,
        slug: "i-luv-computational-graphs"
    },
    {
        id: 9,
        ...boundlessMeta,
        readTime: boundlessReadTime,
        component: BoundlessHumanity,
        slug: "boundless-humanity"
    },
    {
        id: 10,
        ...powerMeta,
        readTime: powerReadTime,
        component: PowerVirtue,
        slug: "power-really-is-a-virtue"
    },
    {
        id: 11,
        ...hierarchicalMeta,
        readTime: hierarchicalReadTime,
        component: HierarchicalSource,
        slug: "hierarchical-source-attention"
    },
    {
        id: 12,
        ...routingMeta,
        readTime: routingReadTime,
        component: RoutingInduction,
        slug: "routing-as-differentiable-program-induction"
    }
];
