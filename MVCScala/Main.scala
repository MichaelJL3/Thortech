
/**
 * @file Main.scala
 * @author Michael Laucella
 * @desc entry process for application
 * grabs and shapes data from DB then beings MVC process
 */

/**
 * @name MVC
 * @desc entry point for the MVC application
 * @extends App
 */
object MVC extends App {
    
    //starting the controller
    val controller = new Controller(masterData)
    
    //starting the view
    val ui = new UI
    ui.visble = true

    //close db connection
    
}
