<?php
/**
 * @package eclerx
 * @category Core
 * @author amitpomu
 */
namespace Eclerx;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Core
{

    protected static $instance = null;

    public static function get_instance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct()
    {
        self::init();
        self::register();
    }

    public function register()
    {
        // include_once ECLERX_BASE_PATH . '/includes/pattern.php';
        include_once ECLERX_BASE_PATH . '/includes/routes.php';
    }

    public function init()
    {
        // register block categories
        add_filter('block_categories_all', array($this, 'register_block_category'), 10, 2);

        //register blocks
        add_action('init', array($this, 'blocks_init'));
        
        //enqueue scripts
        add_action('wp_enqueue_scripts', array($this, 'enqueue_script'));

        add_action('wp', function() {
            // check if the block exists 
            if ((is_singular() && (has_block('eclerx/newsletter', get_post()) || has_block('eclerx/newsletter-new', get_post())))) {
                // enqueue scripts
                add_action('wp_enqueue_scripts', array($this, 'localize_api_data'));
            }
        });
    }

    public function enqueue_script() {
        // Load style
		wp_enqueue_style('eclerx-style', ECLERX_URL_PATH . 'assets/css/style.css');
    }

    public function localize_api_data()
    {
        // api js
        wp_register_script('eclerx-api', ECLERX_URL_PATH . 'assets/js/api.js', '', '', true);

        wp_localize_script('eclerx-api', 'eclerx_api_data', [
            'root' => esc_url(rest_url('eclerx/v1/registeruser')),
            'nonce' => wp_create_nonce('wp_rest')
        ]);
    }

    /*
     * register block categories
     */
    public function register_block_category($block_categories)
    {
        array_unshift(
            $block_categories,
            array(
                'slug' => 'eclerx',
                'title' => __('Eclerx', 'eclerx')
            )
        );
        return $block_categories;
    }

    /*
     * register block names
     */
    public static function get_blocks_names()
    {
        $blocks = array(
            // 'newsletter',
            'newsletter-new',
        );
        return $blocks;
    }

    // register blocks
    public function blocks_init()
    {
        foreach (self::get_blocks_names() as $block_name) {
            register_block_type(ECLERX_BASE_PATH . '/blocks/build/' . $block_name);
        }
    }
}

// Initialize
Core::get_instance();
