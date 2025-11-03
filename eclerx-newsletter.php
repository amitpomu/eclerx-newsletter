<?php
/**
 * Plugin Name:       Eclerx Newsletter
 * Plugin URI:        localhost
 * Description:       This block allows you to create subscribtion form for latest news in single post/page.
 * Version:           1.0.2
 * Tested up to: 	  6.8
 * Requires PHP:      7.4
 * Author:            amitpomu
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       eclerx
 *
 * @package Eclerx
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

if (!class_exists('Eclerx_Newsletter')) {
	final class Eclerx_Newsletter
	{

		protected static $instance = null;

		public static function get_instance()
		{
			if (is_null(self::$instance)) {
				self::$instance = new self;
			}
			return self::$instance;
		}

		public function __construct()
		{
			$this->constant();
			$this->core_init();
		}

		public function constant()
		{
			// defination of core paths
			define('ECLERX_BASE_PATH', dirname(__FILE__));
			define('ECLERX_URL_PATH', plugin_dir_url(__FILE__));
			define('ECLERX_PLUGIN_BASE_PATH', plugin_basename(__FILE__));
			define('ECLERX_PLUGIN_FILE_PATH', (__FILE__));
		}

		public function core_init()
		{
			include_once ECLERX_BASE_PATH . '/includes/core.php';
		}

	}
}

if (!function_exists('eclerx_newsletter_plugin')) {
	function eclerx_newsletter_plugin()
	{
		return Eclerx_Newsletter::get_instance();
	}
	eclerx_newsletter_plugin();
}
