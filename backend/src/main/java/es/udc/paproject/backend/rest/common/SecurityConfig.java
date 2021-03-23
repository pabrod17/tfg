package es.udc.paproject.backend.rest.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private JwtGenerator jwtGenerator;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.cors().and().csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.addFilter(new JwtFilter(authenticationManager(), jwtGenerator))
			.authorizeRequests()
			.antMatchers("/users/signUp").permitAll()
			.antMatchers("/teams*").permitAll()
			.antMatchers("/teams/*").permitAll()
			.antMatchers("/teams/team/*").permitAll()
			.antMatchers("/teams/toSeason/*").permitAll()
			// .antMatchers("/teams/all").permitAll()
			// .antMatchers("/teams/find/*").permitAll()
			.antMatchers("/teams/update/*").permitAll()
			.antMatchers("/teams/addTeam/*").permitAll()
			.antMatchers("/teams/remove/*").permitAll()
			.antMatchers("/teams/addTeamToSeason/*").permitAll()

			.antMatchers("/seasons*").permitAll()
			.antMatchers("/seasons/*").permitAll()
			.antMatchers("/seasons/season/*").permitAll()
			.antMatchers("/seasons/toTeam/*").permitAll()
			.antMatchers("/seasons/betweenDates*").permitAll()
			.antMatchers("/seasons/update/*").permitAll()
			.antMatchers("/seasons/addSeason/*").permitAll()
			.antMatchers("/seasons/remove/*").permitAll()

			.antMatchers("/users/login").permitAll()
			.antMatchers("/users/loginFromServiceToken").permitAll()
			.anyRequest().hasRole("USER");

	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		
		CorsConfiguration config = new CorsConfiguration();
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		config.setAllowCredentials(true);
	    config.addAllowedOrigin("*");
	    config.addAllowedHeader("*");
	    config.addAllowedMethod("*");
	    
	    source.registerCorsConfiguration("/**", config);
	    
	    return source;
	    
	 }

}
