<?php
/**
 * @package eclerx
 * @category Pattern
 * @author amitpomu
 */
namespace Eclerx;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Pattern
{

    protected static $instance = null;

    public static function get_instance(): Pattern
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct()
    {
        add_action('init', array($this, 'register_pattern_category'));
        add_action('init', array($this, 'register_pattern'));
    }

    public function register_pattern()
    {
        if (function_exists('register_block_pattern')) {

            register_block_pattern(
                'eclerx/newsletter-pattern',
                array(
                    'title' => __('eClerx Newsletter Pattern', 'eclerx'),
                    'description' => __('A newsletter signup section with heading, paragraph, form, and image.', 'eclerx'),
                    'categories' => array('eclerx-patterns'),
                    'content' => '
                    <!-- wp:columns {"verticalAlignment":null,"align":"wide","className":"eclerx-newsletter-pattern","style":{"spacing":{"padding":{"right":"var:preset|spacing|20","left":"var:preset|spacing|20"}}}} -->
                    <div class="wp-block-columns alignwide eclerx-newsletter-pattern" style="padding-right:var(--wp--preset--spacing--20);padding-left:var(--wp--preset--spacing--20)"><!-- wp:column {"verticalAlignment":"center"} -->
                    <div class="wp-block-column is-vertically-aligned-center"><!-- wp:eclerx/newsletter -->
                    <div class="wp-block-eclerx-newsletter eclerx-newsletter-block"><div class="eclerx-newsletter-wrapper"><div class="eclerx-newsletter-label"><!-- wp:heading {"level":3,"style":{"spacing":{"margin":{"top":"0","bottom":"0"},"typography":{"fontWeight":"600","fontSize":"42px","lineHeight":"1.3","letterSpacing":"2"}}}} -->
                    <h3 class="wp-block-heading" style="margin-top:0;margin-bottom:0">Sign up to the Penguin Newsletter</h3>
                    <!-- /wp:heading -->

                    <!-- wp:paragraph -->
                    <p class="">For the latest books, recommendations, author interviews and more</p>
                    <!-- /wp:paragraph --></div><form id="eclerx-newsletter" novalidate><input type="text" name="safename" id="safename" value="" class="eclerx-safe" aria-hidden="true"/><div class="eclerx-row"><div class="eclerx-newsletter-input-wrapper eclerx-column-half"><input type="text" id="firstname" name="firstname" placeholder="Your Firstname" aria-describedby="firstname-error" aria-invalid="false" required/><span id="firstname-error" class="eclerx-error" role="alert"></span></div><div class="eclerx-newsletter-input-wrapper eclerx-column-half"><input type="text" id="surname" name="surname" placeholder="Your Surname" aria-describedby="surname-error" aria-invalid="false"/><span id="surname-error" class="eclerx-error" role="alert"></span></div></div><div class="eclerx-row"><div class="eclerx-newsletter-input-wrapper eclerx-column-half"><input type="email" id="email" name="email" placeholder="Your Email" aria-describedby="email-error" aria-invalid="false" required/><span id="email-error" class="eclerx-error" role="alert"></span></div><div class="eclerx-newsletter-input-wrapper eclerx-column-half"><button type="submit">Sign up</button></div></div></form><div class="eclerx-newsletter-info"><span class="eclerx-caption">By signing up, I confirm that I\'m over 16. To find out what personal data we collect and how we use it, please visit our Privacy Policy</span><span id="eclerx-info-message" data-status=""></span></div></div></div>
                    <!-- /wp:eclerx/newsletter --></div>
                    <!-- /wp:column -->

                    <!-- wp:column {"verticalAlignment":"center"} -->
                    <div class="wp-block-column is-vertically-aligned-center"><!-- wp:image {"id":192,"sizeSlug":"full","linkDestination":"none","align":"center"} -->
                    <figure class="wp-block-image aligncenter size-full"><img src="' . ECLERX_URL_PATH . 'assets/images/eclerx-image.png" alt="" class="wp-image-192"/></figure>
                    <!-- /wp:image --></div>
                    <!-- /wp:column --></div>
                    <!-- /wp:columns -->
                ',
                )
            );
        }
    }

    public function register_pattern_category()
    {
        if (function_exists('register_block_pattern_category')) {
            register_block_pattern_category(
                'eclerx-patterns',
                array('label' => __('Eclerx Patterns', 'eclerx'))
            );
        }
    }

}
// Initialize
Pattern::get_instance();