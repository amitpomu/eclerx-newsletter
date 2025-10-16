<?php
/**
 * @package eclerx
 * @category Rest API
 * @author amitpomu
 */

namespace Eclerx;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class API
{
    protected static $instance = null;

    // route namespace
    protected $namespace = 'eclerx/v1';
    
    // register user as subscriber
    protected $base = 'registeruser';

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct()
    {
        $this->init();
    }

    public function init()
    {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->base,
            array(
                'methods' => 'POST',
                'callback' => array($this, 'confirm_new_subscriber'),
                'permission_callback' => '__return_true'
            )
        );
    }

    public function confirm_new_subscriber( \WP_REST_Request $request)
    {
        // check nonce
        $nonce = $request->get_header('X-WP-Nonce');
        if (!wp_verify_nonce($nonce, 'wp_rest')) {
            return new \WP_Error('invalid_nonce', __('Invalid nonce.', 'eclerx'), array('status' => 400));
        }
        $safe_name = $request->get_param('safeName');
        $first_name = sanitize_text_field($request->get_param('firstName'));
        $surname = sanitize_text_field($request->get_param('surName'));
        $email = sanitize_email($request->get_param('email'));

        // honey bot check
        if (!empty($safe_name)) {
            return new \WP_Error('invalid_user', __('We are bot protected.', 'eclerx'), array('status' => 400));
        }

        // email validation
        if (empty($email) || !is_email($email)) {
            return new \WP_Error('invalid_email', __('Invalid email address.', 'eclerx'), array('status' => 400));
        }

        // Email setup
        $subject = 'Subject: Thanks for subscribing!';
        $body = sprintf(
            'Hi %s, thanks for joining our newsletter.',
            !empty($first_name) ? esc_html($first_name) : ''
        );
        $headers = ['Content-Type: text/plain; charset=UTF-8'];

        // Send the email
        $mail_sent = wp_mail($email, $subject, $body, $headers);

        if (!$mail_sent) {
            return new \WP_REST_Response([
                'success' => false,
                'message' => __('Subscription saved, but email failed to send.', 'eclerx')
            ], 500);
        }

        // Return success
        return new \WP_REST_Response([
            'success' => true,
            'message' => __('Successfully subscribed! A confirmation email has been sent.', 'eclerx'),
            'data' => [
                'firstName' => $first_name,
                'surname' => $surname,
                'email' => $email,
            ]
        ], 200);
    }

}
API::get_instance();